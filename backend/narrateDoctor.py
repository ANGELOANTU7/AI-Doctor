import time

response_file_path = "Narration/response.txt"
question_file_path = "Narration/question.txt"
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
    with open(question_file_path, "w") as file:
        file.write(question)
    print("Question added:", question)

def check_for_changes():
    global previous_response
    global question_counter

    while True:
        with open(response_file_path, "r") as file:
            current_response = file.read().strip()

        if current_response != previous_response:
            if current_response.lower() == "bye":
                print("Questionnaire completed.")
                break

            print("Change detected in response file.")
            if question_counter < len(questions):
                selected_question = questions[question_counter]
                addquestion(selected_question)
                question_counter += 1
                if question_counter == len(questions):
                    print("All questions have been completed. The questionnaire will be concluded after the current question.")
            else:
                print("All questions have been completed. The questionnaire will be concluded after the current question.")
                break

            previous_response = current_response

        time.sleep(1)  # Wait for 1 second before checking again

# Start monitoring the response file for changes and add new questions if necessary
check_for_changes()
