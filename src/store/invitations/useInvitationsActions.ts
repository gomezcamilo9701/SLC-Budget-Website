import { useAppDispatch } from "../../hooks/store";
import { TInvitationData } from "../../types";
import { addInvitation, editInvitation } from "./invitationsSlice";

export const 	useInvitationsActions = () => {
	const dispatch = useAppDispatch();

	const createInvitation = (invitation: TInvitationData) => {
			dispatch(addInvitation(invitation));
	};

	const updateInvitation = (answer: any) => {
		dispatch(editInvitation(answer));
	};

	return { createInvitation, updateInvitation };
};