import { HandPalm, Play } from 'phosphor-react';


import { createContext, useState } from 'react';
import { Countdown } from './components/Countdown';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType  {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

export const Home = () => {

	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

	const markCurrentCycleAsFinished = () => {
		setCycles( state => state.map(cycle => {
			if(cycle.id === activeCycleId) {
				return {
					...cycle, finishedDate: new Date()
				};
			} else {
				return cycle;
			}
		}));
	};

	// const handleCreateNewCycle = (data: NewCycleFormData) => {
	// 	const id = String(new Date().getTime()); 
	// 	const newCycle: Cycle = {
	// 		id,
	// 		task: data.task,
	// 		minutesAmount: data.minutesAmount,
	// 		startDate: new Date()
	// 	};

	// 	setCycles(state => [...state, newCycle]);
	// 	setActiveCycleId(id);

	// 	reset();
	// };
    
	const handleInterruptCycle = () => {
		setCycles( state => 
			state.map(cycle => {
				if(cycle.id === activeCycleId) {
					return {
						...cycle, interruptedDate: new Date()
					};
				} else {
					return cycle;
				}
			}));
		setActiveCycleId(null);
	};

	// const task = watch('task');
	// const isSubmitDisabled: boolean = !task;
    
	return (
		<HomeContainer>
			<form action="" /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
				
				<CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}>
					{/* <NewCycleForm /> */}
					<Countdown />
				</CyclesContext.Provider>
			
				{ activeCycle ? (
					<StopCountdownButton onClick={handleInterruptCycle} type="button">
						<HandPalm size={24}/>
                        Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton /* disabled={isSubmitDisabled} */ type="submit">
						<Play size={24}/>   
                        Começar
					</StartCountdownButton>
				) }
			</form>
		</HomeContainer>
	);
};