function main () {
    var today = new Date().toString()//.substr(0,21);
    console.log(new Date().getDate()+1);
}

//main();
function test() {
    const today = new Date().toString()
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1).toUTC();
    console.log(tomorrow);
}

test();