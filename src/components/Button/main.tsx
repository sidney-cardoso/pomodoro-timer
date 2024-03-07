import { ButtonContainer, ButtonVariant } from './styles.ts';

interface ButtonProps {
    variant?: ButtonVariant;
}

export const Button = ({ variant = 'primary'}: ButtonProps) => {
	return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
};
