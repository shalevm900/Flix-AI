from model.ai.chatGpt import ChatGPT

class aiFactory:
    _instances = {}
    
    @staticmethod
    def get_llm(llm_type):
        if llm_type not in aiFactory._instances:
            if llm_type == "chatgpt":
                aiFactory._instances[llm_type] = ChatGPT()
            else:
                raise ValueError(f"Unsupported LLM type: {llm_type}")
        return aiFactory._instances[llm_type]
    
    @staticmethod
    def getAssistantResponse(llm_type, userText):
        llm = aiFactory.get_llm(llm_type)
        return llm.get_response(userText)

    @staticmethod
    def convertAudioToText(llm_type, audio_file):
        llm = aiFactory.get_llm(llm_type)
        return llm.convert_audio_to_text(audio_file)