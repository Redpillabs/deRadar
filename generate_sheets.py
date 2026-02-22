
import pandas as pd
import os

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

# Create DataFrames (empty)
df_founders = pd.DataFrame(columns=founder_columns)
df_talent = pd.DataFrame(columns=talent_columns)

# Create a Pandas Excel writer using XlsxWriter as the engine.
file_path = 'DeRadar_Form_Responses.xlsx'
with pd.ExcelWriter(file_path, engine='xlsxwriter') as writer:
    df_founders.to_excel(writer, sheet_name='Founders', index=False)
    df_talent.to_excel(writer, sheet_name='Talent', index=False)
    
    # Get the workbook and worksheet objects
    workbook = writer.book
    worksheet_founders = writer.sheets['Founders']
    worksheet_talent = writer.sheets['Talent']
    
    # Add a header format
    header_format = workbook.add_format({
        'bold': True,
        'text_wrap': True,
        'valign': 'top',
        'fg_color': '#D7E4BC',
        'border': 1
    })
    
    # Write the column headers with the defined format.
    for col_num, value in enumerate(founder_columns):
        worksheet_founders.write(0, col_num, value, header_format)
        
    for col_num, value in enumerate(talent_columns):
        worksheet_talent.write(0, col_num, value, header_format)
        
    # Adjust column widths
    worksheet_founders.set_column(0, 12, 20)
    worksheet_talent.set_column(0, 11, 20)

print(f"Excel file created at: {os.path.abspath(file_path)}")
