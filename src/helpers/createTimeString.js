function createTimeString(timestamp) {
     const tiempo = new Date(timestamp  * 1000);
   return tiempo.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
}

export default createTimeString
