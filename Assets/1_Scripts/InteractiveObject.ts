import { Collider, GameObject, ParticleSystem, Vector3, WaitForSeconds } from 'UnityEngine';
import { ZepetoCharacter, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class InteractiveObject extends ZepetoScriptBehaviour {

    private myCharacter: ZepetoCharacter;

    public speedControl: bool;
    public SpeedAddObject: GameObject;
    public speedAddAmount: int;
    public speedAddTime: int;
    @Space(10)
    public JumpControl: bool;
    public JumpAddObject: GameObject;
    public JumpAddAmount: int;
    public JumpAddTime: int;
    @Space(10)
    public nowStatus: String;
    public objectParticle: ParticleSystem;
    public characterParticle: ParticleSystem;

    Start() {    
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
            this.myCharacter = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer.character;
        });
    }

    OnTriggerEnter(collider: Collider) {
        if(this.speedControl == true) {
            GameObject.Destroy(this.SpeedAddObject);
            this.myCharacter.additionalWalkSpeed = this.speedAddAmount;
            this.myCharacter.additionalRunSpeed = this.speedAddAmount;
            this.nowStatus = "Speed_Added";
            this.speedControl = false;
            this.StartCoroutine(this.SpeedUpRoutine());
            
            this.objectParticle.Play();
            this.characterParticle.Play();
            this.StartCoroutine(this.EffectTraceRoutine());
        }
        if(this.JumpControl == true) {
            GameObject.Destroy(this.JumpAddObject);
            this.myCharacter.additionalJumpPower = this.JumpAddAmount;
            this.nowStatus = "Jump_Added";
            this.JumpControl = false;
            this.StartCoroutine(this.JumpAddRoutine());
            
            this.objectParticle.Play();
            this.characterParticle.Play();
            this.StartCoroutine(this.EffectTraceRoutine());
        }
    }

    *SpeedUpRoutine () {
        yield null;
        yield new WaitForSeconds(this.speedAddTime);
        this.myCharacter.additionalWalkSpeed = 0;
        this.myCharacter.additionalRunSpeed = 0;
        this.nowStatus = "";
    }

    *JumpAddRoutine () {
        yield null;
        yield new WaitForSeconds(this.JumpAddTime);
        this.myCharacter.additionalJumpPower = 0;
        this.nowStatus = "";
    }

    // [Cannot read property 'transform' of undefined] 에러 발생
    // Update() {
    //     if(null == this.myCharacter) return;
    //     this.characterParticle.transform.position = new Vector3(this.myCharacter.transform.position.x, this.myCharacter.transform.position.y + 1.5, this.myCharacter.transform.position.z);
    // }

    // 원인 알 수 없어서 코루틴으로 대체하니 정상적으로 작동
    *EffectTraceRoutine () {
        while(this.nowStatus == "Speed_Added" || this.nowStatus == "Jump_Added") {
            yield null;
            if(null == this.myCharacter) return;
            this.characterParticle.transform.position = new Vector3(this.myCharacter.transform.position.x, this.myCharacter.transform.position.y + 1.5, this.myCharacter.transform.position.z);
            yield new WaitForSeconds(0.05);
        }
        this.characterParticle.Stop();
    }

}