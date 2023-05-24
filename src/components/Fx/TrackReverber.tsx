import { MixerMachineContext } from "../../App";
import { powerIcon } from "../../assets/icons";
import type { Reverb } from "tone";

type Props = {
  reverb: Reverb;
  trackIndex: number;
};

export default function TrackReverber({ reverb, trackIndex }: Props) {
  // const [state, send] = MixerMachineContext.useActor();
  const { send } = MixerMachineContext.useActorRef();

  const reverbsBypass = MixerMachineContext.useSelector(
    (state) => state.context.trackFxData[trackIndex].reverbsBypass
  );

  const reverbsMix = MixerMachineContext.useSelector(
    (state) => state.context.trackFxData[trackIndex].reverbsMix
  );

  const reverbsPreDelay = MixerMachineContext.useSelector(
    (state) => state.context.trackFxData[trackIndex].reverbsPreDelay
  );

  const reverbsDecay = MixerMachineContext.useSelector(
    (state) => state.context.trackFxData[trackIndex].reverbsDecay
  );

  const disabled = reverbsBypass[trackIndex];

  return (
    <div>
      <div className="flex gap12">
        <h3>Reverb</h3>
        <div className="power-button">
          <input
            id={`track${trackIndex}reverbBypass`}
            type="checkbox"
            className="power-btn"
            value={reverbsBypass[trackIndex]}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              send({
                type: "BYPASS_TRACK_REVERB",
                checked: e.currentTarget.checked,
                reverb,
                trackIndex,
              });
            }}
            checked={reverbsBypass[trackIndex]}
          />
          <label htmlFor={`track${trackIndex}reverbBypass`}>{powerIcon}</label>
        </div>
      </div>
      <div className="flex-y">
        <label htmlFor="mix">Mix:</label>
        <input
          type="range"
          className="simple-range"
          name="mix"
          min={0}
          max={1}
          step={0.01}
          value={reverbsMix[trackIndex]}
          disabled={disabled}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            send({
              type: "CHANGE_TRACK_REVERB_MIX",
              value: parseFloat(e.currentTarget.value),
              reverb,
              trackIndex,
            });
          }}
        />
      </div>
      <div className="flex-y">
        <label htmlFor="pre-delay">Pre Delay:</label>
        <input
          type="range"
          className="simple-range"
          name="pre-delay"
          min={0}
          max={1}
          step={0.01}
          value={reverbsPreDelay[trackIndex]}
          disabled={disabled}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            send({
              type: "CHANGE_TRACK_REVERB_PREDELAY",
              value: parseFloat(e.currentTarget.value),
              reverb,
              trackIndex,
            });
          }}
        />
      </div>
      <div className="flex-y">
        <label htmlFor="decay">Decay:</label>
        <input
          type="range"
          className="simple-range"
          name="decay"
          min={0.1}
          max={20}
          step={0.1}
          value={reverbsDecay[trackIndex]}
          disabled={disabled}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            send({
              type: "CHANGE_TRACK_REVERB_DECAY",
              value: parseFloat(e.currentTarget.value),
              reverb,
              trackIndex,
            });
          }}
        />
      </div>
    </div>
  );
}
