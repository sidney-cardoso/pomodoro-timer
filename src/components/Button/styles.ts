import styled, {css}from "styled-components";



export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';


const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green',
}

interface ButtonContainerProps {
    variant: 'primary' | 'secondary' | 'danger' | 'success';
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    border: 0;
    border-radius: 8px;
    margin: 8px;
    background-color: ${props => props.theme["green-500"]};
    color: ${props => props.theme.white};
    /* ${props => css`background-color: ${buttonVariants[props.variant]}`} */
`
