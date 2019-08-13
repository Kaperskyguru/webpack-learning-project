class Helloworld {
    apply(compiler) {
        compiler.hooks.done.tap({
            name: "Helloworld"
        }, () => {
            console.log('Hello world');

        });
    }
};

module.exports = Helloworld;