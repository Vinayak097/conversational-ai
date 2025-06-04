import { useConversation } from '@elevenlabs/react';
import { PhoneOff } from 'lucide-react';
import React, { useCallback } from 'react'


const Conversation = () => {
      const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
    });


const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      // Start the conversation with your agent
      
      await conversation.startSession({
        agentId:"agent_01jwwwyqpfep0s6expbhv2gpj0", // Replace with your agent ID
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);
  return (
     <div
      className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 shadow-[0_0_64px_64px_#0000001a] 
                w-fit h-10 py-8 px-3  rounded-full flex items-center gap-2"
    >
      {/* Placeholder for animated avatar or canvas */}
      <div className="relative h-[36px] w-[36px] rounded-full bg-gray-200 overflow-hidden">
        {/* You can replace this with a canvas or animation */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          🎙️
        </div>
      </div>

      {/* Call Button */}
      
      <button
        onClick={conversation.status=="connected" ?stopConversation:startConversation}
        disabled={!conversation.status}
        className=" p-4 w-fit h-10 font-medium text-sm leading-5 tracking-tight uppercase font-sans flex items-center justify-center  gap-2 rounded-full bg-black text-white 
                   hover:bg-red-700 transition-all"
      >
        <PhoneOff className="w-4 h-4" />
        {conversation.status=="connecting" ? "Connecting":(
          conversation.status=='connected'?"End Call":"Voice Chat"
        )}
        
      </button>
    </div>
  )
}

export default Conversation