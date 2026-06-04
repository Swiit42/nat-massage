import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "./server/service_key_google.json",
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({
  version: "v3",
  auth,
});

const event = {
  summary: "Test réservation massage",
  description: "Test depuis l'application",
  start: {
    dateTime: "2026-06-10T10:00:00",
    timeZone: "Europe/Paris",
  },
  end: {
    dateTime: "2026-06-10T11:00:00",
    timeZone: "Europe/Paris",
  },
};

const result = await calendar.events.insert({
  calendarId: "nat.massage.pro@gmail.com",
  requestBody: event,
});

console.log(result.data.htmlLink);