const os =  require("os");

// info about current user:
const user = os.userInfo();
console.log(user);

//info about system uptime:
console.log(`The system's uptime is ${os.uptime().toLocaleString()} seconds`);

const currentOs ={
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem:os.freemem(),
    platform:os.platform(),
    version:os.version(),
    machine:os.machine()
};
console.log(currentOs)