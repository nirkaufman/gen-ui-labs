import { z } from 'zod';

// define a schema for the notifications
export const alertSchema = z.object({
  alerts: z.array(
      z.object({
        alertType: z.string().describe('The type of the alert. example: "info", "warning", "error".'),
        message: z.string().describe('Short message to display to the user.'),
      }),
  ),
});
