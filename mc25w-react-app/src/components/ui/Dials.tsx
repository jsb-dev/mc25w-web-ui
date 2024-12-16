import CircularPercentDial from "../shared/CircularPercentDial";
import CircularGainDial from "../shared/CircularGainDial";

export const InputGainDIal = () => {
    return (
        <CircularGainDial label={'In Gain'} />
    );
}

export const OutputGainDIal = () => {
    return (
        <CircularGainDial label={'Out Gain'} />
    );
}

export const SaturationAmountDial = () => {
    return (
        <CircularPercentDial label={'Saturation'} />
    );
}

export const SoftClippingAmountDial = () => {
    return (
        <CircularPercentDial label={'Soft Clipping'} />
    );
}

