import pandas as pd

# Define the DataMapper class
class DataMapper:
    def __init__(self):
        self.data = {}
        self.gender_mapping = {"Male": 1, "Female": 0}
        self.symptoms_mapping = {
            "mildcold": 1,
            "headache": 2,
            "mildfever": 3,
            "fever": 4,
            "pain": 5,
            "runningnose": 6,
            "sorethroat": 7
        }
        self.location_mapping = {"ernakulam": 1, "thrissur": 2, "kollam": 3, "kannur": 4}

    def scale_blood_pressure(self, blood_pressure):
        normal_range = (90, 120)  # Define the normal blood pressure range
        difference = abs(float(blood_pressure) - sum(normal_range) / 2)
        scale = 3 - (difference / ((normal_range[1] - normal_range[0]) / 2))
        scaled_value = max(min(round(scale), 3), 1)  # Scale the value and round to the nearest integer between 1 and 3
        return scaled_value

    def scale_temperature(self, temperature):
        normal_range = (36.5, 37.5)  # Define the normal body temperature range
        difference = abs(float(temperature) - sum(normal_range) / 2)
        scale = 3 - (difference / ((normal_range[1] - normal_range[0]) / 2))
        scaled_value = max(min(round(scale), 3), 1)  # Scale the value and round to the nearest integer between 1 and 3
        return scaled_value

    def add_data(self, location, gender, age, bmi, symptoms, duration, smoker, blood_pressure, temperature, disease_risk):
        # Map gender to its numeric equivalent
        gender_numeric = self.gender_mapping.get(gender, -1)  # -1 for unknown gender

        # Map symptoms to their numeric equivalents
        symptoms_list = symptoms.split(",")
        symptoms_numeric = [self.symptoms_mapping.get(symptom.lower(), 0) for symptom in symptoms_list]

        # Map location to its numeric equivalent
        location_numeric = self.location_mapping.get(location.lower(), 0)

        # Extract systolic and diastolic values from blood pressure
        systolic, diastolic = map(int, blood_pressure.split('/'))

        # Calculate average blood pressure
        average_blood_pressure = (systolic + diastolic) / 2

        # Scale blood pressure based on the difference from normal range
        blood_pressure_scaled = self.scale_blood_pressure(average_blood_pressure)

        # Scale temperature based on the difference from normal range
        temperature_scaled = self.scale_temperature(temperature)

        # Create a unique identifier for the data entry
        entry_id = len(self.data) + 1

        # Store the data in a dictionary
        self.data[entry_id] = {
            "Location": location_numeric,
            "Gender": gender_numeric,
            "Age": age,
            "BMI": bmi,
            "Symptoms": symptoms_numeric,
            "Duration of Symptoms": duration,
            "Smoker": 1 if smoker else 0,
            "Blood Pressure": blood_pressure_scaled,
            "Temperature": temperature_scaled,
            "Disease Risk": disease_risk
        }

        return entry_id


# Create an instance of the DataMapper class
data_mapper = DataMapper()

# Read the input CSV file
input_file = 'ml model\\risk_medium.csv'

# Read the CSV file into a DataFrame
df = pd.read_csv(input_file)

# Iterate over the rows of the DataFrame and add the mapped data using the DataMapper
for index, row in df.iterrows():
    entry_id = data_mapper.add_data(
        location=row['Location'],
        gender=row['Gender'],
        age=row['Age'],
        bmi=row['BMI'],
        symptoms=row['Symptoms'],
        duration=row['Duration of Symptoms'],
        smoker=row['Smoker'],
        blood_pressure=row['BP'],
        temperature=row['Temperature'],
        disease_risk=row['Disease Risk']
    )

# Convert the data to a DataFrame
new_data = pd.DataFrame(data_mapper.data.values())


# Read the input CSV file
input_file = 'ml model\\risk_medium.csv'  # Replace with the path to your CSV file
df = pd.read_csv(input_file)

# Iterate over the rows of the DataFrame and add the mapped data using the DataMapper
for index, row in df.iterrows():
    entry_id = data_mapper.add_data(
        location=row['Location'],
        gender=row['Gender'],
        age=row['Age'],
        bmi=row['BMI'],
        symptoms=row['Symptoms'],
        duration=row['Duration of Symptoms'],
        smoker=row['Smoker'],
        blood_pressure=row['BP'],
        temperature=row['Temperature'],
        disease_risk=row['Disease Risk']
    )

# Convert the data to a DataFrame
new_data = pd.DataFrame(data_mapper.data.values())

# Display the new_data DataFrame
print(new_data)
