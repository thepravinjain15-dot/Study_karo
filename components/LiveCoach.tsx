
import React, { useEffect, useState, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';

const LiveCoach: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [status, setStatus] = useState<'connecting' | 'listening' | 'speaking' | 'error'>('connecting');
  const [transcription, setTranscription] = useState<string>('');
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  useEffect(() => {
    const startSession = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const inputCtx = new AudioContext({ sampleRate: 16000 });
        const outputCtx = new AudioContext({ sampleRate: 24000 });
        audioContextRef.current = outputCtx;

        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-12-2025',
          callbacks: {
            onopen: () => {
              setStatus('listening');
              const source = inputCtx.createMediaStreamSource(stream);
              const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
              scriptProcessor.onaudioprocess = (e) => {
                const inputData = e.inputBuffer.getChannelData(0);
                const int16 = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
                const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
                sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } }));
              };
              source.connect(scriptProcessor);
              scriptProcessor.connect(inputCtx.destination);
            },
            onmessage: async (message: LiveServerMessage) => {
              if (message.serverContent?.outputTranscription) {
                setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
              }
              const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
              if (audioBase64) {
                setStatus('speaking');
                const audioBuffer = await decodeAudioData(decodeBase64(audioBase64), outputCtx, 24000, 1);
                const source = outputCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputCtx.destination);
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
                source.onended = () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) setStatus('listening');
                };
              }
              if (message.serverContent?.interrupted) {
                sourcesRef.current.forEach(s => s.stop());
                sourcesRef.current.clear();
                nextStartTimeRef.current = 0;
              }
            },
            onerror: () => setStatus('error'),
            onclose: () => setStatus('connecting'),
          },
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: "You are a world-class skill coach. Help the user practice their skill through a voice conversation. Be encouraging and provide actionable tips.",
            outputAudioTranscription: {},
          }
        });

        sessionRef.current = await sessionPromise;
      } catch (e) {
        console.error(e);
        setStatus('error');
      }
    };

    startSession();
    return () => {
      sessionRef.current?.close();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[300] bg-indigo-900/95 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="max-w-xl w-full text-center space-y-12">
        <div className="space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            <div className={`absolute inset-0 bg-white/20 rounded-full animate-ping ${status === 'listening' || status === 'speaking' ? 'block' : 'hidden'}`}></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center text-5xl shadow-2xl">
              {status === 'speaking' ? '🗣️' : status === 'listening' ? '👂' : '🔄'}
            </div>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tight">
            {status === 'connecting' ? 'Connecting to Coach...' : 
             status === 'listening' ? 'Listening to You...' : 
             status === 'speaking' ? 'Coach is Speaking...' : 'Something went wrong'}
          </h2>
          <p className="text-indigo-200 font-medium">Practice your skill in real-time with SkillSwap AI</p>
        </div>

        <div className="bg-white/10 rounded-2xl p-6 min-h-[120px] max-h-[300px] overflow-y-auto text-left border border-white/10">
          <p className="text-white/80 text-sm leading-relaxed italic">
            {transcription || "Transcription will appear here..."}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
           <button 
             onClick={onClose}
             className="bg-white text-indigo-900 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-xl"
           >
             End Practice Session
           </button>
        </div>
      </div>
    </div>
  );
};

export default LiveCoach;
