import { editUser } from "../store/user/slice";
import { ProfileForEdit } from "../types";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

  const updateUser = async (user: ProfileForEdit) => {
		dispatch(editUser(user))
	}

	return { updateUser };
};