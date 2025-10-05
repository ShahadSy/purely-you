//horizontal scrolling in home
const scrollContainer = document.querySelector('.scroll-content');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const scrollStep = 200; // this is based on image size
leftBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: -scrollStep, behavior: 'smooth' });
});
rightBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({ left: scrollStep, behavior: 'smooth' });
});
//chatbot
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot-window');
    chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
}

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    const messagesDiv = document.getElementById('chatbot-messages');
    messagesDiv.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

    let response = "❔ Sorry, I didn't understand. Please contact us for more help!";
    const msg = message.toLowerCase();

    if (msg.includes("shipping")) {
        response = "🚚 Free shipping for orders above $50! and worldwide shipping available";
    } else if (msg.includes("return")) {
        response = "🔄 You can return products within 14 days ,otherwise we are sorry.";
    } else if (msg.includes("appointment")) {
        response = " Book dermatologist appointments from the 'Book' button on their profiles for online consultation.";
    } else if (msg.includes("branch") || msg.includes("location")) {
        response = "📍 Our branches are located in Beirut, forn shbek, and ashrafieh!";
    } else if (msg.includes("payment") || msg.includes("currency")) {
        response = " We accept Dollar, Euro, and Lebanese Lira (L.L) when delivery!";
    } else if (msg.includes("hi") || msg.includes("hello")) {
        response = "wlecome , how can i help you";
    } else if (msg.includes("long") || msg.includes("order")) {
        response = "in lebanon within 2 days , worldwide 15 days";
    } else if (msg.includes("boycot") || msg.includes("israel") || msg.includes("gaza") || msg.includes("palestine")) {
        response = "ofcourse we DO NOT support killers!";
    }else if(msg.includes("results")){
        response ="you will see results after 2 weeks of using them"
    }else if(msg.includes("zainab")){
        response ="who do not love her ?!!!"
    }else if(msg.includes("men")){
        response ="yes of course it is for both genders"
    }

    messagesDiv.innerHTML += `<div><strong>Purely You Bot:</strong> ${response}</div>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the latest message
    input.value = "";
}
// Appointment Booking
function handleAppointment(event, doctorName) {
    event.preventDefault();
    const date = event.target.querySelector('input[name="appointmentDate"]').value;

    if (new Date(date) < new Date()) {
        alert("⚠️ You can't book an appointment in the past.");
        return;
    }//to tell if he already booked an appointment
    const existingAppointment = localStorage.getItem('appointment');
    if(existingAppointment && existingAppointment.includes(doctorName) && existingAppointment.includes(date)){
        alert(`you already have an appointment with dr. ${doctorName}`);
        return;
    }
    const appointmentInfo = `Doctor: ${doctorName} - Date: ${date}`;
    localStorage.setItem('appointment', appointmentInfo);
    alert('✅ Appointment booked successfully!');
}
