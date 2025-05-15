import openai
class ChatGPT:
    def __init__(self):
        self.client = None
        self.assistant_id = "asst_j4FWW1tsVbEfw1tK3wAD9pi2"
        self.api_key = "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"
        
    def initialize(self):
        import openai
        self.client = openai.OpenAI(api_key=self.api_key)
        
    def get_response(self, userText):
        try:
            if not self.client:
                self.initialize()

            headers = {"OpenAI-Beta": "assistants=v2"}
            # Create a thread
            thread = self.client.beta.threads.create(extra_headers=headers)
            # Add the user's message to the thread
            self.client.beta.threads.messages.create(
                thread_id=thread.id,
                role="user",
                content=userText,
                extra_headers=headers
            )

            # Run the assistant
            run = self.client.beta.threads.runs.create(
                thread_id=thread.id,
                assistant_id=self.assistant_id,
                extra_headers=headers
            )
            
            # Wait for the run to complete
            while True:
                run_status = self.client.beta.threads.runs.retrieve(
                    thread_id=thread.id,
                    run_id=run.id,
                    extra_headers=headers
                )
                if run_status.status == 'completed':
                    break
            
            # Get the assistant's response
            messages = self.client.beta.threads.messages.list(
                thread_id=thread.id,
                extra_headers=headers
            )

            # Return the last message (assistant's response)
            return messages.data[0].content[0].text.value
            
        except Exception as e:
            raise e

    def convert_audio_to_text(self, audio_file):
        try:
            if not self.client:
                self.initialize()

            audio_file.stream.seek(0)

            transcript = self.client.audio.transcriptions.create(
                model="whisper-1",
                file=(audio_file.filename, audio_file.stream)
            )
            return transcript.text

        except Exception as e:
            raise e