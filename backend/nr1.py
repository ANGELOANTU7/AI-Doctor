import time

response_file_path = "backend/response.txt"
question_file_path = "question.txt"
previous_response = ""
question_counter = 0
questions = [
    # Medical History
    "Throughout your life, have you faced any medical conditions that required diagnosis and treatment?",
    "Reflecting on your health journey, have you ever undergone any surgeries or hospitalizations? If so, please enlighten me about the reasons, dates, and any noteworthy details.",
    # Present Symptoms
    "Presently, what are the prominent symptoms or health issues you find yourself grappling with? Help me understand when these symptoms made their first appearance and how you would gauge their severity.",
    "Have you noticed any particular triggers or factors that tend to exacerbate or alleviate these symptoms? Your insights can provide valuable clues for diagnosis and treatment.",
    # Family Medical Backgrounds
    "Within your immediate family—your parents, siblings, or even extended family—have there been any noteworthy medical conditions worth mentioning? I'm interested in understanding if certain conditions run in the family and their impact.",
    "Are there any specific medical conditions that have affected your parents, siblings, or close relatives? Knowing these details helps us comprehend your genetic predispositions and potential risk factors.",
    # Social History
    "In your past or present, have you ever engaged in smoking or been exposed to its effects? It would be helpful to learn about your smoking habits, including duration and average number of cigarettes per day.",
    "To assess your environmental health risks, it's essential to explore your exposure to secondhand smoke. Have you been subjected to secondhand smoke either at home or in your workplace?",
    # Body Vitals
    "So that I may better understand your overall health, could you kindly provide me with your current weight, height, and, if known, your body mass index (BMI)?",
    "Have you recently measured your blood pressure, heart rate, or temperature? If so, please share the values, as they contribute to our evaluation of your physical well-being."
]

def addquestion(question):
    global question_counter
    
    with open(question_file_path, "w") as file:
        file.write(question)
    
    question_counter += 1

def check_for_changes():
    global previous_response
    
    while True:
        with open(response_file_path, "r") as file:
            current_response = file.read().strip()

        if current_response != previous_response:
            if current_response.lower() == "bye":
                break

            # Select the next question based on the current question counter
            if question_counter < len(questions):
                selected_question = questions[question_counter]
                addquestion(selected_question)
            else:
                # End of questions, write a message indicating the completion
                addquestion("Thank you for providing the necessary information. We have completed the questionnaire.")
                break

            # Update the previous response to the current one
            previous_response = current_response

       # time.sleep(1)  # Wait for 1 second before checking again

# Start monitoring the response file for changes and add new questions if necessary
check_for_changes()
