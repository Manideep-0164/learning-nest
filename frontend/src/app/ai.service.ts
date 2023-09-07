import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AIService {

  constructor(private http : HttpClient) { }

  public async makeOpenAIRequest(token:string,prompt: string) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Correct API endpoint
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
    const body = {
        model: 'gpt-3.5-turbo', // You can use 'gpt-3.5-turbo' or other suitable models
        messages: [
            {
                role: 'system',
                content: 'You are a institute tutor assisting with OpenAI chat completions.',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    };

    const response = await axios.post(apiUrl, body, { headers });
    return response.data.choices[0].message.content;
}


}
