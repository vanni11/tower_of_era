import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from 'ZEPETO.Character.Controller'
 
export default class CharacterController extends ZepetoScriptBehaviour {

    Start() {        
        ZepetoPlayers.instance.CreatePlayerWithZepetoId("", "zxs1", new SpawnInfo(), true);
 
        //제페토 캐릭터가 정상적으로 생성되는지 리스너가 듣고있다가, 그 로컬플레이어를 this.zepetoCharacter 변수에 넣음
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            let _player: LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
        });

        ZepetoPlayers.instance.motionV2Data.Gravity = 20;
    }
    
}