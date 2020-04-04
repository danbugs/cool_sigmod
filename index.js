// <globals>
let k_scale = window.innerWidth/40;
// </globals>

// <html>
let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
// </html>

(function main(){
    // <context + canvas setup>
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.translate(0, canvas.height / 2)
    context.font = "30px Verdana";
    // </context + canvas setup>

    // <title>
    context.fillStyle = "#000000";
    context.fillText("AM Project - Dan Chiarlone", 0, -canvas.height/2+30);

    // <generating binary sequence>
    let b_k = [];
    let K = 40;
    for(let i = 0; i < K; i++){
        b_k.push(Math.round(Math.random()))
    }
    console.log(b_k);
    // </generating binary sequence>

    // <plot x(t) & b(t)>
    let dt = 0.001; 
    // above is where the data rate
    // would come in but I changed it
    // because it made visualization
    // impossible without zoom in.
    let f_c = 315;
    context.scale(1, -1);
    for(let i = 0; i < b_k.length; i+=dt){
        let t = i;

        // <b(t)>
        let b_t = b_k[Math.round(i)];
        plot(t, b_t, "#FF0000");
        // </b(t)>

        // <x(t)>
        let x = Math.cos(f_c*i)*b_t;
        plot(t, x, "#0000FF");
        // </x(t)>
    }
    // </plot x(t) & b(t)>

    // <legend + axis>
    context.scale(1, -1);
    context.fillStyle = "#000000";
    context.font = "20px Verdana";
    context.fillText("red: bit sequence, blue: x(t)", 0, canvas.height/2-20);

    context.font = "10px Verdana";
    for(let i = 0; i < K; i++){
        context.fillStyle = "#000000";
        context.fillText(`${i}Tb`, i*k_scale, 0-10);
    }
    // </legend + axis>
})()

function plot(x, y, color){
    context.fillStyle = color;
    context.fillRect(x*k_scale, y*k_scale, 5, 5);
}