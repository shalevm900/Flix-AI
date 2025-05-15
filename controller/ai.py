from flask import request, jsonify, make_response
from model.aiFactory import aiFactory

class AiController:
    def resolve(self,user_text):
        aiAssistant = aiFactory()
        try:
            response = aiFactory.getAssistantResponse("chatgpt", userText=user_text)
            return jsonify(
                {
                    "status": 0,
                    "assistantResponse": response
                }
            ), 200
        except Exception as e:
            return jsonify(
                {
                    "status": 1,
                    "error": e
                }
            ), 400


    def voiceSearch(self, audio_file):
        aiAssistant = aiFactory()
        try:
            response = aiAssistant.convertAudioToText("chatgpt",audio_file)
            return jsonify(
                {
                    "status": 0,
                    "text": response
                }
            ), 200
        except Exception as e:
            return jsonify(
                {
                        "status": 1,
                        "error": "Error With Whisper"
                }
            ), 400