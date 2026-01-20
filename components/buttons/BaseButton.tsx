import { Pressable, PressableProps } from "react-native";
import { darkenColor, lightenColor } from "../../utils/color";

interface BaseButtonProps extends PressableProps {
    children?: React.ReactNode;
    bgColor: string;
    hoverEffect?: 'lighten' | 'darken';
    disabledColor?: string;
}

export function BaseButton(props: BaseButtonProps) {
    const {
        children,
        style = {},
        bgColor,
        hoverEffect = 'lighten',
        disabled,
        disabledColor = bgColor,
        ...rest
    } = props;

    const chosenHoverEffect = hoverEffect === 'lighten' ? lightenColor : darkenColor;

    return (
        <Pressable
            style={ (state: any) => ({
                backgroundColor: disabled ? disabledColor : state.hovered ? chosenHoverEffect(bgColor, 10) : bgColor,
                ...(typeof style === 'function' ? style(state) : style)
            }) }
            disabled={ disabled }
            { ...rest }
        >
            { children }
        </Pressable>
    );
}