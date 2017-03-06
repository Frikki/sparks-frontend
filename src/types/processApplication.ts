import { Stream } from 'most';
import { HashMap } from './repository';
import { Opportunity } from './domain';
import { FirebaseUserChange } from '../drivers/firebase-user/index';

export interface UserApplicationModel {
  user: FirebaseUserChange;
  opportunity: Opportunity | null;
  teams: any | null;
  userApplication: UserApplication | null;
  errorMessage: String | null;
  validationMessages: ValidationResult;
}

export interface UserApplicationModelNotNull {
  user: FirebaseUserChange;
  opportunity: Opportunity ;
  teams: any ;
  userApplication: UserApplication;
  errorMessage: String;
  validationMessages: ValidationResult;
}

// export type UserApplications = HashMap<UserApplication>;
export interface UserApplication {
  userKey: string;
  opportunityKey: string;
  about: ApplicationAboutInfo;
  questions: ApplicationQuestionInfo;
  teams: TeamsInfo;
  progress: Progress;
}

export interface AboutStateRecord$ {
  'superPower': Stream<string>;
  'legalName': Stream<string>;
  'preferredName': Stream<string>;
  'phone': Stream<string>;
  'birthday': Stream<string>;
  'zipCode': Stream<string>;
}

export interface AboutStateRecord {
  'superPower': string;
  'legalName': string;
  'preferredName': string;
  'phone': string;
  'birthday': string;
  'zipCode': string;
}

export type PhoneNumber = string;
export type ZipCode = string;
export type DatePickerInfo = string;

export interface ApplicationAboutYouInfo {
  superPower: string;
}

export interface ApplicationPersonalInfo {
  legalName: string;
  preferredName: string;
  phone: PhoneNumber;
  birthday: DatePickerInfo;
  zipCode: ZipCode;
}

export interface ApplicationAboutInfo {
  aboutYou: ApplicationAboutYouInfo;
  personal: ApplicationPersonalInfo;
}

export interface ApplicationQuestionInfo {
  answer: string;
}

export interface TeamsInfo {
  [teamKey: string]: ApplicationTeamInfo;
}

export interface ApplicationTeamInfo {
  answer: string;
  // NOTE : semantics are true <=> field value passed validation
  alreadyFilledIn: boolean;
  hasBeenJoined: boolean;
}

export type Step = string; // actually should be an enum
export interface Progress {
  step: Step;
  hasApplied: boolean;
  hasReviewedApplication: boolean;
  latestTeamIndex: number;
}

export const STEP_ABOUT = 'about';
export const STEP_QUESTION = 'question';
export const STEP_TEAMS = 'teams';
export const STEP_REVIEW = 'review';
export const STEP_TEAM_DETAIL = 'team_detail';
export const STEP_APPLIED = 'step_applied';
// export const applicationProcessSteps = [STEP_ABOUT, STEP_QUESTION, STEP_TEAMS, STEP_REVIEW,
// STEP_TEAM_DETAIL, STEP_APPLIED];
export const applicationProcessSteps = {
  // NOTE !! It is very important that the keys and the values are equal!!
  [STEP_ABOUT]: STEP_ABOUT,
  [STEP_QUESTION]: STEP_QUESTION,
  [STEP_TEAMS]: STEP_TEAMS,
  [STEP_TEAM_DETAIL]: STEP_TEAM_DETAIL,
  [STEP_REVIEW]: STEP_REVIEW,
  [STEP_APPLIED]: STEP_APPLIED
};

export type ValidationResult = HashMap<boolean|string>;

export const aboutYouFields = ['superPower'];
export const personalFields = ['birthday', 'phone', 'preferredName', 'zipCode', 'legalName'];
export const questionFields = ['answer'];
