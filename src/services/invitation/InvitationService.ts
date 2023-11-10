import CONSTANTS from "../../constants";
import { InvitationsPaginationResponse, TInvitationCreate, TInvitationResponse } from "../../types";
import { TokenService } from "../token/TokenService";

export const createInvitationInBd = async (invitationData: TInvitationCreate) => {
  const token = TokenService.getToken();

  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const response = await fetch(
      `${CONSTANTS.BASE_URL}${CONSTANTS.CREATE_INVITATION}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invitationData),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Create invitation request failed: ${response.status} ${response.text}`
      );
    }
    const data: TInvitationResponse = await response.json();
    return data;
  } catch (err) {
    console.error("Create invitation errror", err);
    throw err;
  }
};

export const getInvitationsByEvent = async (eventId: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.GET_INVITATIONS_BY_EVENT}/${eventId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Get event request failed: ${response.status} ${response.text}`);
    }

    const responseData: InvitationsPaginationResponse  = await response.json();
    const invitations = responseData.content;
    const pageInfo = responseData.pageable;

    return { invitations, pageInfo };
  } catch (error) {
    console.error("Get event request error:", error);
    throw error;
  }
}; 

export const updateInvitation = async (invitationId: number, newInvitationState: "ACCEPTED" | "PENDING" | "REJECTED") => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.UPDATE_INVITATION}/${invitationId}?invitationState=${newInvitationState}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Get event request failed: ${response.status} ${response.text}`);
    }

    const responseData: TInvitationResponse  = await response.json();
    return responseData;
  } catch (error) {
    console.error("Get event request error:", error);
    throw error;
  }
}; 