const url =  fetch('https://randomuser.me/api/');
let img = document.getElementById('card-img');
let title = document.getElementById('title');
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
const pictur = document.getElementById('card-img');
const bulb = document.getElementById('light-bulb');
const logo = document.getElementById('logo');

let color = "white";
bulb.addEventListener("click", ()=>{
    if(color === "white") {
        bulb.style.filter = 'invert(0)' 
        logo.style.filter = 'invert(1)' 
        document.body.style.background = "white"
        document.body.style.color = "black"
        color = "black";
    }else{
        bulb.style.filter = 'invert(1)'
        logo.style.filter = 'invert(0)' 
        document.body.style.background = "black"
        document.body.style.color = "white"
        color = "white";
    }
})

async function userdata(){
    let data = await url;
    
   try {
    let response = await data.json();
        console.log(response.results[0]);
        title.innerHTML = response.results[0].name.title;
        firstname.innerHTML = response.results[0].name.first;
        lastname.innerHTML = response.results[0].name.last;
        img.setAttribute('src', response.results[0].picture.large)
    
   } catch (error) {
    console.log(error);
   }
   
}

userdata()

// // Reusable polling/fetch utility for periodically calling an API.
// const API_URL = 'https://randomuser.me/api/';

// const img = document.getElementById('card-img');
// const title = document.getElementById('title');
// const firstname = document.getElementById('firstname');
// const lastname = document.getElementById('lastname');

// async function fetchUser(signal) {
//     const res = await fetch(API_URL, { signal });
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
//     return res.json();
// }

// function updateUI(response) {
//     const user = response.results && response.results[0];
//     if (!user) return;
//     console.log(user);
//     title.textContent = user.name.title;
//     firstname.textContent = user.name.first;
//     lastname.textContent = user.name.last;
//     img.setAttribute('src', user.picture.large);
// }

// /**
//  * Start polling an API.
//  * Options:
//  * - interval: ms between successful polls (default 5000)
//  * - immediate: run immediately before waiting first interval
//  * - onData(response): called on success
//  * - onError(err, retries): called on error
//  * - backoffFactor, maxBackoff: exponential backoff settings for retries
//  * Returns { stop } to cancel polling.
//  */
// function startPolling({
//     interval = 1000,
//     immediate = true,
//     onData,
//     onError,
//     backoffFactor = 2,
//     maxBackoff = 60000,
// } = {}) {
//     let stopped = false;
//     let retries = 0;
//     let timeoutId = null;
//     const controller = new AbortController();

//     // local visibility handler so we can remove it when stopping
//     function handleVisibility() {
//         if (document.hidden) {
//             // pause: clear any pending call
//             if (timeoutId) {
//                 clearTimeout(timeoutId);
//                 timeoutId = null;
//             }
//         } else {
//             // resume immediately when tab becomes visible
//             if (!stopped) poll();
//         }
//     }

//     async function poll() {
//         if (stopped) return;
//         try {
//             const json = await fetchUser(controller.signal);
//             retries = 0;
//             onData && onData(json);
//             // schedule next run at normal interval
//             if (!stopped) timeoutId = setTimeout(poll, interval);
//         } catch (err) {
//             // ignore aborts triggered by stop()
//             if (err.name === 'AbortError') return;
//             retries += 1;
//             onError && onError(err, retries);
//             // exponential backoff before retrying
//             const backoff = Math.min(interval * Math.pow(backoffFactor, retries), maxBackoff);
//             if (!stopped) timeoutId = setTimeout(poll, backoff);
//         }
//     }

//     // start polling
//     document.addEventListener('visibilitychange', handleVisibility);
//     if (immediate) poll(); else timeoutId = setTimeout(poll, interval);

//     function stop() {
//         stopped = true;
//         controller.abort();
//         if (timeoutId) clearTimeout(timeoutId);
//         document.removeEventListener('visibilitychange', handleVisibility);
//     }

//     return { stop };
// }

// // Example usage: start polling and update UI
// const poller = startPolling({
//     interval: 8000, // 8s between successful requests
//     immediate: true,
//     onData: (response) => updateUI(response),
//     onError: (err, retries) => console.error('poll error', err, 'retries:', retries),
// });

// // If you want to stop polling later, call:
// // poller.stop();   