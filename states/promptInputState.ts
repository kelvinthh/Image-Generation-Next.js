import { atom } from 'recoil';

export const promptInputState = atom({
    key: "promptInput",
    default: "",
});