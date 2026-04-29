import { ElectionData } from '../types/index.js';

export const ELECTION_DATA: Record<string, ElectionData> = {
  'India': {
    country: 'India',
    timeline: [
      { id: '1', date: 'January 2026', title: 'Voter List Revision', description: 'ECI begins the annual summary revision of electoral rolls.', status: 'completed' },
      { id: '2', date: 'March 2026', title: 'State Assembly Elections', description: 'Major state elections conducted in multiple phases.', status: 'current' },
      { id: '3', date: 'May 2026', title: 'Results Declaration', description: 'Counting of votes and announcement of state government winners.', status: 'upcoming' },
      { id: '4', date: '2029', title: 'General Election', description: 'Next nationwide democratic exercise in India.', status: 'upcoming' }
    ],
    steps: [
      { id: 's1', title: 'Verify Registration', description: 'Check your name in the updated 2026 electoral roll.', icon: 'registration' },
      { id: 's2', title: 'Find Polling Station', description: 'Locate your booth via the ECI Voter Helpline App.', icon: 'location' },
      { id: 's3', title: 'Cast Your Vote', description: 'Bring your EPIC card or approved photo ID to the poll.', icon: 'vote' }
    ]
  },
  'USA': {
    country: 'USA',
    timeline: [
      { id: '1', date: 'January 2026', title: 'Candidate Filings', description: 'Deadlines for candidates to file for Midterm Elections.', status: 'completed' },
      { id: '2', date: 'June 2026', title: 'Primary Season', description: 'States hold primary elections to select party nominees.', status: 'current' },
      { id: '3', date: 'Nov 3, 2026', title: 'Midterm Election Day', description: 'Citizens vote for House and Senate representatives.', status: 'upcoming' },
      { id: '4', date: 'Jan 3, 2027', title: 'Congressional Swearing-in', description: 'Newly elected members of Congress take office.', status: 'upcoming' }
    ],
    steps: [
      { id: 's1', title: 'Register to Vote', description: 'Ensure you are registered for the 2026 Midterm cycle.', icon: 'check' },
      { id: 's2', title: 'Request Absentee', description: 'Apply for mail-in ballots if you cannot visit the polls.', icon: 'ballot' },
      { id: 's3', title: 'Vote on Nov 3', description: 'Participate in the Midterm elections.', icon: 'vote' }
    ]
  }
};
