import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class PlayController extends ZepetoScriptBehaviour {
    
    private myCharacter: ZepetoCharacter;

    Start() {    
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }

    Update() {
        try {
            if(null == this.myCharacter) {
                return;
            }
        } catch (error) {
            console.log("PlayController Error : " + error);
        }
    }

}