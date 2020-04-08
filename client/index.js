// <html>
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
// </html>

(function main(){
    // <context + canvas setup>
    canvas.height = parent.innerHeight/2;
    canvas.width = parent.innerWidth/2;
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.translate(0, canvas.height / 2)
    context.font = "30px Verdana";
    // </context + canvas setup>

    // <generating binary sequence>
    let b_k = [];
    let K = 64;
    for(let i = 0; i < K; i++){
        b_k.push(Math.round(Math.random()))
    }
    console.log(b_k);
    // </generating binary sequence>

    // <plot x(t) & b(t)>
    let dt = 1/K; 
    // above is where the data rate
    // would come in but I changed it
    // because it made visualization
    // impossible without zoom in.
    let f_c = 315*1000;
    let x = new Float32Array(b_k.length);
    let b_t = new Float32Array(b_k.length);
    context.scale(1, -1);

    for(let i = 0; i < b_k.length; i++){
        let t = i * dt;

        // <b(t)>
        b_t[i] = b_k[Math.round(i/8)];
        context.fillStyle = '#FF0000';
        context.fillRect(t*window.innerWidth/2, b_t[i]*window.innerHeight/8, 5, 5);        
        // </b(t)>

        // <x(t)>
        x[i] = Math.cos(f_c*2*Math.PI*t)*b_t[i];
        context.fillStyle = '#0000FF';
        context.fillRect(t*window.innerWidth/2, x[i]*window.innerHeight/8, 5, 5);   
        // </x(t)>
    }
    // </plot x(t) & b(t)>

    // <legend + axis>
    context.scale(1, -1);
    context.fillStyle = "#000000";
    context.font = "20px Verdana";
    context.fillText("red: bit sequence, blue: x(t)", 0, canvas.height/2-40);

    // context.font = "10px Verdana";
    // for(let i = 0; i < K; i++){
    //     context.fillStyle = "#000000";
    //     context.fillText(`${i}Tb`, i*k_scale, 0-10);
    // }
    // </legend + axis>

    let button = document.querySelector('button#get-fft');

    button.addEventListener('click', (e) => {
        e.preventDefault();
        let x_req = {
            x: x
        }
        let server = "https://sigmod-server.now.sh/";
        
        // let server = "http://localhost:3001/";
        fetch(server + "fft", {
            method: "POST",
            body: JSON.stringify(x_req),
            headers: {                              
                "content-type": "application/json"
            }                                       
        })
        .then(response => response.json())
        .then(fft => {
            // <context + canvas setup>
            canvas.height = window.innerHeight/2;
            canvas.width = window.innerWidth/2;
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.translate(0, canvas.height / 2)
            context.font = "30px Verdana";
            // </context + canvas setup>
      
            context.scale(1, -1);
            for(let i = 0; i < fft.length; i++){
                let t = i * dt;
        
                // <FFT>
                context.fillStyle = '#FF0000';
                context.fillRect(t*window.innerWidth/2, fft[i]*window.innerHeight -window.innerHeight/4, 5, 5);   
                // </FFT>
            }
        })
        .catch(error => console.log(error));
    })
})()

function plot(x, y, color){

}