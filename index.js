registerSW()

async function registerSW(){
    if('serviceWorker' in navigator)
    {
        try
        {
            await navigator.serviceWorker.register('../../sw.js')
            console.log("Service Worker Registered")
        }
        catch(e)
        {
            console.log("Failed to register service worker")
        }
    }
}