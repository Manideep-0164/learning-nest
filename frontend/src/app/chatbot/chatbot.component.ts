import { Component,ViewChild, ElementRef, AfterViewChecked,Input,OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { AIService } from '../ai.service';
import { promptForBot } from '../Allmodels.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked , OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  @Input() data: any;
  chatMessages: { text: string, isUser: boolean }[] = [];
  constructor (private globalservice : GlobalService,private AiService : AIService,private http: HttpClient) {}

  visible: boolean = false;
 
  
  ngOnInit(): void {
    this.chatMessages.push({text :`Hello! ${this.data || 'User'}`,isUser:false},{text :'Welcome to EduHub',isUser:false},{text :'How can I assist you today?',isUser:false})


    


  }
  
  
  
  
  
  
      showDialog() {
       
          this.visible = true;
      }
    
    async sendMessage(): Promise<void> {
    
    const userMessage = document.querySelector('.chat-input input') as HTMLInputElement;
    let messageText = userMessage.value.trim();
   

    
    if (messageText) {
      this.chatMessages.push({ text: messageText, isUser: true });

      // Simulate a bot response (you can replace this with actual chatbot logic)
      userMessage.value = '';

      
      

      let messageForBot = {
        message : messageText
      }


      console.log(messageText);
      
      
      let botResponse ="";
       this.http.post(`${environment.API_URL}/api/ai/chat`, messageForBot).subscribe((res:any)=>{
        console.log('response',res);
        botResponse = res?.message
        this.chatMessages.push({ text:  res?.message, isUser: false });
        
       })
        
       

      userMessage.value = '';
      messageText = "";
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

}
