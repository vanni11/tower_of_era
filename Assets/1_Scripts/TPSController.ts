import { GameObject, Light, Quaternion, Transform, Vector3 } from 'UnityEngine';
import { ZepetoCamera, ZepetoCharacter, ZepetoPlayers, ZepetoScreenTouchpad } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TPSController extends ZepetoScriptBehaviour {

    private myCharacter: ZepetoCharacter;

    @Header("Camera Angle")
    public myCamera: ZepetoCamera;
    public cameraX: int;
    public cameraY: int;
    public cameraZ: int;

    public tower: GameObject;

    @Header("Light Position")
    public light: Light;
    public lightX: int;
    public lightY: int;
    public lightZ: int;

    Start() {
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
            this.myCamera = ZepetoPlayers.instance.LocalPlayer.zepetoCamera;
        });
    }

    Update() {
        try {
            if(null == this.myCharacter || null == this.myCamera) {
                return;
            }
    
            var targetposition = new Vector3(this.tower.transform.position.x, this.myCharacter.transform.position.y, this.tower.transform.position.z);
            this.myCamera.cameraParent.transform.LookAt(targetposition);
            this.myCamera.cameraParent.transform.Rotate(new Vector3(this.cameraX, this.cameraY, this.cameraZ));

            this.light.transform.position = new Vector3(this.myCharacter.transform.position.x + this.lightX, this.myCharacter.transform.position.y + this.lightY, this.myCharacter.transform.position.z + this.lightZ);
        } catch (error) {
            console.log("TPSController Error : " + error);
        }
    }

}