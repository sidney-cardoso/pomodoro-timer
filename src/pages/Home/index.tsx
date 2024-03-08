import { Play } from 'phosphor-react';

import { useForm } from 'react-hook-form';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles';

export const Home = () => {

	const { register, handleSubmit, watch } = useForm();
    
    
	const handleCreateNewCycle = (data: unknown) => {
		console.log(data);
	};
    
	const task = watch('task');
	const isSubmitDisabled: boolean = !task;
    
	return (
		<HomeContainer>
			<form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormContainer>
					<label htmlFor="task">Vou trabalha em</label>
					<TaskInput 
						id="task"
						list="task-suggestions"
						placeholder="Dê um nome para o seu projeto"
						{...register('task')}
					/>
                    
					<datalist id="task-suggestions">
						<option value="Projeto 1" />
						<option value="Projeto 2" />
						<option value="Projeto 3" />
						<option value="Projeto 4" />
					</datalist>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput 
						type="number" 
						id="minutesAmount" 
						placeholder='00' 
						step={5}
						min={5}
						max={60}
						{...register('minutesAmount', { valueAsNumber: true})}
					/>

					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<StartCountdownButton disabled={!isSubmitDisabled} type="submit">
					<Play size={24}/>
                    Começar
				</StartCountdownButton>
			</form>
		</HomeContainer>
	);
};