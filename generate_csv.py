
import csv

# Define the columns for Founders
founder_columns = [
    'Timestamp', 'Telegram', 'Twitter', 'Email', 'Project Name', 'Website', 
    'Category', 'Description', 'Services Needed', 'Budget', 'Outcome', 
    'Timeline', 'Urgency'
]

# Define the columns for Talent/Workers
talent_columns = [
    'Timestamp', 'Twitter', 'Telegram', 'Email', 'Region', 'Niches', 
    'Best Post', 'Avg Impressions', 'Engagement Rate', 'Screenshot', 
    'Collaboration Pref', 'Contribution'
]

with open('Founders_Data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(founder_columns)

with open('Talent_Data.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(talent_columns)

print("CSV files created.")
