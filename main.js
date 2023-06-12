class LoginScreen{
    constructor(){
        this.screen = document.getElementById('login_screen');
        this.btn_login = document.getElementById('btn_login');
        this.init_events();
        this.audio_error = new Audio("audios/fondo/error.mp3");
        this.keyword = 'dulcecito de leche';
        this.login_input = document.getElementById('login_input');
    }
    init_events(){
            this.btn_login.addEventListener("click",()=>this.enter_player())
    }
    enter_player(){
        if (this.validate_login()){
            this.screen.style.transform = "translateX(110vw)";
            document.getElementById("player_screen").style.transform = "translateX(0)";
        }
        else{
            this.btn_login.classList.add("btn_login_animate")
            this.audio_error.load();
            this.audio_error.play();
            this.btn_login.getElementsByTagName("img")[0].src = "iconos/Decepticon.png"
            setTimeout(()=>{
                this.btn_login.classList.remove('btn_login_animate')
                this.btn_login.getElementsByTagName("img")[0].src = "iconos/autobot.png"

            },300)
        }
    }
    validate_login(){
        let all_ok = false;
        let keyword = this.login_input.value.toLowerCase();
        if ( keyword== this.keyword){
            all_ok = true;
        }

        return all_ok
    }
}

const loginScreen = new LoginScreen()

class Message_music{
    constructor(){
        this.label_message = document.getElementById("player_message");
        this.is_maximized = false;
        // this.sound_click = new Audio("audios/fondo/click2.mp3");
        // this.sound_click.volume = 0.3;
        
        this.init_events();

    }
    avtivate_events(is_desktop){
        this.intervalo;
        if (is_desktop){
            this.label_message.addEventListener("mouseover",function(){});
            this.label_message.addEventListener("mouseout",function(){});
            this.label_message.addEventListener('touchstart', ()=> {
                this.intervalo = setInterval(()=> {
                  if (this.is_maximized == false) {
                      this.label_message.style.width = "min(80%,600px)";
                      this.label_message.style.maxHeight = "50vh";
                      this.label_message.style.height = "50vh";
                      this.label_message.style.alignItems = "center";
                      this.label_message.style.boxShadow = "0 0 10px #2f2843c0"
                      this.is_maximized = true;
                    //   this.sound_click.load()
                    //   this.sound_click.play()
                  }
                }, 500); // Intervalo de tiempo en milisegundos
              });
              
              this.label_message.addEventListener('touchend', ()=> {
                clearInterval(this.intervalo);
                this.is_maximized = false;
                // this.label_message.style.position = "relative";
                this.label_message.style.width = "min(80%,600px)";
                // this.label_message.style.bottom = "0";
                this.label_message.style.alignItems = "flex-start";
                this.label_message.style.boxShadow = "none";
                this.label_message.style.maxHeight = "15vh";
                this.label_message.style.height = "15vh";
                
                // this.label_message.style.backgroundColor = "transparent";
                // console.log("touch end")
              });

            
            // console.log("es telefono")
        }

        else{
            this.label_message.addEventListener("mouseover",()=>{
                
                if (this.is_maximized == false) {
                        this.label_message.style.width = "min(80%,600px)";
                        this.label_message.style.height = "50%";
                        this.label_message.style.alignItems = "center";
                        this.label_message.style.maxHeight = "50%";
                        this.label_message.style.boxShadow = "0 0 20px 5px #2f2843c0"
                        this.is_maximized = true;
                      //   this.sound_click.load()
                      //   this.sound_click.play()
                    }
                  } // Intervalo de tiempo en milisegundos
            )
            this.label_message.addEventListener("mouseout",()=>{
                this.is_maximized = false;
                // this.label_message.style.position = "relative";
                this.label_message.style.width = "min(80%,600px)";
                // this.label_message.style.bottom = "0";
                this.label_message.style.alignItems = "flex-start";
                this.label_message.style.boxShadow = "none";
                this.label_message.style.height = "15%";
                this.label_message.style.maxHeight = "15%";
            })
            this.label_message.addEventListener("touchstart",()=>{});
            this.label_message.addEventListener("touchend",()=>{});
            // console.log("es desktop")
        }
    }
    check_orientation() {
        let esTelefono = /Mobi|Android/i.test(navigator.userAgent);
        this.avtivate_events(esTelefono);
    }
    init_events(){
        this.check_orientation();
        window.addEventListener("resize",()=>{
            this.check_orientation();
        });
    }

    cambiar_mensaje(mensaje){
        this.label_message.innerHTML = mensaje
    }
}

class Message_information{
    constructor(){
        this.message = document.getElementById("information");
        this.btn_info = document.getElementById("btn_info");
        this.is_show = false;
        this.generic_close = document.getElementById("player");
        this.init_events();
        
    }
    init_events(){
        this.btn_info.addEventListener("click",()=>{
            this.show(!this.is_show);
        })
        this.generic_close.addEventListener("click",()=>{
            this.show(false);
        });
    }
    show(show){
        if (show){
            this.message.style.maxHeight = "max-content";
            this.message.style.top = "12vh";
        }

        else{
            this.message.style.maxHeight = "10vh";
            this.message.style.top = "2vh";
        }

        this.is_show =  show;

    }
}

class Player{
    constructor(){
        this.current_audio = document.getElementById("current_audio");
        this.current_music_index = 0;
        this.audio_click = new Audio("audios/fondo/click2.mp3");
        // this.image = document.getElementById("player_img");
        this.title = document.getElementById("player_title");
        this.message = new Message_music();
        this.is_playing = false;
        this.limit_time_clicks = 1000; // in milliseconds
        this.ready_to_click = true
        this.is_changing = false
        this.min_total_label  = document.getElementById("min_total_label");
        this.min_actual_label = document.getElementById("min_actual_label");
        this.progress_bar = document.getElementById("duration");
        this.songs = [
            {
                path:"audios/Rude.mp3",
                img:'url("imagens/rude.png")',
                title:'Rude',
                message:`Esta cancion de alguna manera me recuerda la vez que viniste a hablar con mi mama yo se que casi no se parece por el echo de que en la cancion
                no les dan el permiso de estar juntos pero lo que hace que esta cancion me recuerde a ti esq cuando tu viniste a hablar con mi mama te mirabas un poquito nervioso 
                y la cancion retrata de alguna manera el como apesar de estar latente la opcion de que no les permitan estar junton aun haci el se arriesga apor estar con la persona que quiere&#x2764;  `
            },
            {
                path:"audios/Until I Found You.mp3",
                img:'url("imagens/util.png")',
                title:'Until I Found You',
                message:`Dicen que las canciones son para darles un significado unico dependiendo de quien la eschuche y pues cuando yo la escucho de alguna manera tu vienes a mi mente 
               esta cancion para mi retrata la parte de mi vida en la que no queria estar con nadie de una manera romantica por que mi corazon estaba lastimado demasiado fuerte y aun haci cuando me sentia en la mas oscuro
               tu me sacaste de lo mas hondo me hiciste  volver a confiar en alguien mas (tu&#x2764;) y entregar algo que apenas habia sanado por que sabia que lo cuidarian bien y no me equivoque en nada al respecto &#x2764;   `
            },
            {
                path:"audios/Youre The One That.mp3",
                title:'Youre The One That',
                img:'url("imagens/grease.png")',
                message:"Tu diras por que esta cancion,pero esta cancion para mi al escucharla me recuerda el momento en el que me di cuenta que sentia algo por ti en ese momento no sabia exactamente que era pero sabia que era algo muy bonito y en su momento lo confundi con admiracion pero conforme a el paso de los dias me di cuenta que no era eso que era algo mas, pero tenia miedo de aceptar el sentimiento por que pense que no seria correspondido pero cuando me di cuenta que si lo era con ciertas acciones tuyas mi cara emanaba una felicidad que trate de esconderlas hasta el momento adecuado y lo encontre &#x2764; "
            },
        ];
        this.play_btn = document.getElementById('btn_play');
        this.next_btn = document.getElementById('btn_next');
        this.prev_btn = document.getElementById('btn_prev');
        this.init_events();
        this.load_music(this.songs[this.current_music_index]);
        this.progress_bar.value = 0;
    }

    click_sound(){
        this.audio_click.load();
        this.audio_click.play();
    }

    init_events() {
        // play btn
        this.play_btn.addEventListener("click",()=>{
            this.toggle_play()
            this.click_sound()
            
            
        });
       
        //next button
        this.next_btn.addEventListener("click",()=>{
            this.change_music(1)
            this.click_sound()
            
        });
        // button prev
        
        this.prev_btn.addEventListener("click",()=>{
            this.change_music(-1)
            this.click_sound()
            
        });
        // end music
        this.current_audio.addEventListener("ended",()=>{
            if (this.is_changing == false){
                this.change_music(1)
            }
            else{
                this.current_audio.currentTime = this.current_audio.duration - 10
                this.progress_bar.value = this.current_audio.currentTime
            }
            
        })
    
        this.current_audio.addEventListener("timeupdate",()=>this.update_time());
        this.current_audio.addEventListener("loadeddata",()=>{
            const duration = this.current_audio.duration;
            const formatTime = (time)=> String(Math.floor(time)).padStart(2,'0');
            this.min_total_label.textContent = `${formatTime(duration/60)}:${formatTime(duration%60)}`;
            if (this.min_total_label.textContent == "NaN"){
                this.min_total_label.textContent = "0:00";
            }
            this.progress_bar.max = this.current_audio.duration;
            this.ready_to_click = true;
        });
        
        this.progress_bar.addEventListener("input",()=>{
            this.is_changing = true;
            this.current_audio.currentTime = this.progress_bar.value;
            
        })
        this.progress_bar.addEventListener("touchend",()=>this.is_changing = false);
    }

    update_time(){
        const formatTime = (time)=> String(Math.floor(time)).padStart(2,'0');
        const current_time = this.current_audio.currentTime
        this.min_actual_label.textContent = `${formatTime(current_time/60)}:${formatTime(current_time%60)}`;
        this.progress_bar.value = current_time
    }

    toggle_play(){
        if (this.ready_to_click){
            if (this.is_playing){
                this.pause_music();
            }

            else{
                this.play_music();
            }
            
            this.ready_to_click = false
            setTimeout(()=>this.ready_to_click = true,this.limit_time_clicks)
        }
    }

    play_music(){
        this.current_audio.play();
        this.is_playing = true;
        document.getElementById("btn_play_img").src = "iconos/pause.png";

    }

    pause_music(){
        this.current_audio.pause();
        this.is_playing = false;
        document.getElementById("btn_play_img").src = "iconos/play.png";
    }

    load_music(song){
        this.ready_to_click = false;
        this.current_audio.src = song.path;
        this.current_audio.load();
        // this.image.src = song.image;
        this.play_btn.style.backgroundImage = song.img;
        this.title.textContent = song.title;
        document.title = song.title;
        this.message.cambiar_mensaje(song.message);

    }

    change_music(direction){
        if (this.ready_to_click){
            this.current_music_index = (this.current_music_index + direction +this.songs.length)%this.songs.length
            this.load_music(this.songs[this.current_music_index])
            this.play_music()
            this.ready_to_click = false
            setTimeout(()=>this.ready_to_click = true,this.limit_time_clicks)
        }

    }

}

class Player_screen{
    constructor(){
        this.btn_login = document.getElementById("btn_login");
        this.screen = document.getElementById("player_screen");
        this.player_message = new Message_music();
        this.player = new Player();
        this.message_information = new Message_information();
        this.init_events();
    }
    init_events(){
        
    }
}

const player_screen = new Player_screen();