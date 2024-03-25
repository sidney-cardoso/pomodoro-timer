import { createContext, ReactNode, useReducer, useState } from 'react';

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType  {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;

    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
    children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
		if(action.type == 'ADD_NEW_CYCLE') {
			return [...state, action.payload.newCycle];
		}
        
		return state;
	}, []);


	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    
	const setSecondsPassed = (seconds: number) => {
		setAmountSecondsPassed(seconds);            
	};

	const markCurrentCycleAsFinished = () => {
		dispatch({
			type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
			payload: {
				activeCycleId,
			}
		});

		// setCycles( state => state.map(cycle => {
		// 	if(cycle.id === activeCycleId) {
		// 		return {
		// 			...cycle, finishedDate: new Date()
		// 		};
		// 	} else {
		// 		return cycle;
		// 	}
		// }));
	};

	const createNewCycle = (data: CreateCycleData) => {
		const id = String(new Date().getTime()); 
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		};

		// setCycles(state => [...state, newCycle]);
		dispatch({
			type: 'ADD_NEW_CYCLE',
			payload: {
				newCycle,
			}
		});

		setActiveCycleId(id);
		setAmountSecondsPassed(0);
	};
    
	const interruptCurrentCycle = () => {

		dispatch({
			type: 'INTERRUPT_CURRENT_CYCLE',
			payload: {
				activeCycleId,
			}
		});
		// setCycles( state => 
		// 	state.map(cycle => {
		// 		if(cycle.id === activeCycleId) {
		// 			return {
		// 				...cycle, interruptedDate: new Date()
		// 			};
		// 		} else {
		// 			return cycle;
		// 		}
		// 	}));
		setActiveCycleId(null);
	};

	return (
		<CyclesContext.Provider 
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				amountSecondsPassed,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle
			}}    
		>
			{children}
		</CyclesContext.Provider>
	);
};