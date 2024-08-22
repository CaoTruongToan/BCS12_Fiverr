import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { skillService } from "../service/skill.service";

export const getAllSkillApi = createAsyncThunk(
  "skill/getAllSkillApi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await skillService.getAllSkill();
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  listSkill: [],
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSkillApi.fulfilled, (state, action) => {
      state.listSkill = action.payload;
    });
    builder.addCase(getAllSkillApi.rejected, (state, action) => {
      // Handle error here if needed
      console.error('Failed to fetch skills:', action.payload);
    });
  },
});

export default skillSlice.reducer;
