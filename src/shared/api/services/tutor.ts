import { useMutation, useQuery } from "@tanstack/react-query";
import { apiCall } from "../apiCall";

const tutor = async () => {
  const res = await apiCall.get("/tutors/");
  return res.data;
};
export const useTutor = () => {
  return useQuery({
    queryKey: ["tutors"],
    queryFn: tutor,
  });
};

const tutorCreateProfile = async (data: any) => {
  const res = await apiCall.post("/create-tutor-profile/", data);
  return res.data;
};
export const useTutorCreateProfile = () => {
  return useMutation({
    mutationFn: tutorCreateProfile,
  });
};

const updateTutor = async (data: any) => {
  const res = await apiCall.patch("/tutors/me/profile/", data);
  return res.data;
};

export const useUpdateTutor = () => {
  return useMutation({
    mutationFn: updateTutor,
  });
};

const tutorDashboard = async () => {
  const res = await apiCall.get("/tutors/me/dashboard/");
  return res.data;
};

export const useTutorDashboard = () => {
  return useQuery({
    queryKey: ["tutor-dashboard"],
    queryFn: tutorDashboard,
  });
};

const addCertificate = async (data: any) => {
  const res = await apiCall.post("/tutor-certificates/", data);
  return res.data;
};

export const useAddCertificate = () => {
  return useMutation({
    mutationFn: addCertificate,
  });
};

const deleteCertificate = async (id: number) => {
  const res = await apiCall.delete(`/tutor-certificates/${id}/`);
  return res.data;
};

export const useDeleteCertificate = () => {
  return useMutation({
    mutationFn: deleteCertificate,
  });
};

const addEducation = async (data: any) => {
  const res = await apiCall.post("/tutor-educations/", data);
  return res.data;
};

export const useAddEducation = () => {
  return useMutation({
    mutationFn: addEducation,
  });
};

const deleteEducation = async (id: number) => {
  const res = await apiCall.delete(`/tutor-educations/${id}/`);
  return res.data;
};

export const useDeleteEducation = () => {
  return useMutation({
    mutationFn: deleteEducation,
  });
};

const addExperience = async (data: any) => {
  const res = await apiCall.post("/tutor-experiences/", data);
  return res.data;
};

export const useAddExperience = () => {
  return useMutation({
    mutationFn: addExperience,
  });
};

const deleteExperience = async (id: number) => {
  const res = await apiCall.delete(`/tutor-experiences/${id}/`);
  return res.data;
};

export const useDeleteExperience = () => {
  return useMutation({
    mutationFn: deleteExperience,
  });
};
