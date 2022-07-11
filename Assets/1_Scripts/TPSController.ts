import { Quaternion, Transform, Vector3 } from 'UnityEngine';
import { ZepetoCamera, ZepetoCharacter, ZepetoPlayers, ZepetoScreenTouchpad } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TPSController extends ZepetoScriptBehaviour {

    public myCharacter: ZepetoCharacter;
    public myCamera: ZepetoCamera;

    public tower: Transform;

    @Header("Camera Angle")
    public x:int;
    public y:int;
    public z:int;

    Start() {
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            this.myCamera = ZepetoPlayers.instance.LocalPlayer.zepetoCamera;
        });


    }

    Update() {
        if(null == this.myCharacter || null == this.myCamera) {
            return;
        }

        var targetposition = new Vector3(this.tower.transform.position.x, this.myCharacter.transform.position.y, this.tower.transform.position.z);
        this.myCamera.cameraParent.transform.LookAt(targetposition);
        this.myCamera.cameraParent.transform.Rotate(new Vector3(this.x,this.y,this.z));
    }

    

}