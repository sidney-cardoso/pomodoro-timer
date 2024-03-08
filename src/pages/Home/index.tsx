import { Play } from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles';

export const Home = () => {
	return (
		<HomeContainer>
			<form action="">
				<FormContainer>
					<label htmlFor="task">Vou trabalha em</label>
					<TaskInput placeholder="Dê um nome para o seu projeto"type="text" id="task"/>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput type="number" id="minutesAmount" placeholder='00' />

					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartCountdownButton disabled type="submit">
					<Play size={24}/>
                    Começar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
};