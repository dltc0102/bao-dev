class Audio {

    playChipiSong() {
        this.sounds.chipi.play();
    }

    playDefaultSound() {
        this.sounds.default.play();
    }

    playProcSound() {
        this.sounds.procSound.play();
    }

    playNitroSong() {
        this.sounds.rngNitro.play();
    }

    playCatSong() {
        this.sounds.rngCat.play();
    }

    playBisSong() {
        this.sounds.rngBis.play();
    }

    playDrinkSound() {
        this.sounds.drink.play();
    }

    playDutSound() {
        this.sounds.dut.play();
    }
    
    constructor() {
        this.sounds = {
            default: new Sound({ source: "chime-sound-effect.ogg" }),
            procSound: new Sound({ source: "glass-break-effect.ogg" }), 
            rngNitro: new Sound({source: "p4nitro.ogg"}), 
            rngCat: new Sound({source: "blankcat.ogg"}),
            rngBis: new Sound({source: "tvb-news-theme.ogg"}),
            drink: new Sound({source: "drinking-sound-effect.ogg"}), 
            dut: new Sound({source: "dut-sound-effect.ogg"}), 
            chipi: new Sound({source: "chipichipi.ogg"})
        };
    }
}

export default Audio; 



