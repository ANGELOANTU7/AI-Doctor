from fastapi import APIRouter
from transformers import pipeline
import os
import asyncio

route_report_data = APIRouter()

progress = None # just for tracking progress


def read_files():
    directory = "Local_storage\Input"  # Hardcoded directory path
    merged_content = ""

    # Check if the directory exists
    if not os.path.isdir(directory):
        return {"error": "Invalid directory"}

    # Iterate over all files in the directory
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)

        # Check if it's a text file
        if os.path.isfile(filepath) and filename.endswith(".txt"):
            with open(filepath, "r") as file:
                file_content = file.read()
                merged_content += file_content

    return  merged_content



def summary(text):
    # Load the summarization pipeline
    summarizer = pipeline("summarization")
    # Split the text into smaller chunks
    max_tokens_per_chunk = 1024  # Initial value
    max_words_in_summary = 2000000
    # Calculate the maximum number of chunks needed
    max_num_chunks = (max_words_in_summary // max_tokens_per_chunk) + 1
    # Split the text into chunks
    chunks = [text[i:i + max_tokens_per_chunk] for i in range(0, len(text), max_tokens_per_chunk)]
    # for the exceptions
    exceptions = "NULL"
    global progress
    progress = 0 
    # Generate summaries for each chunk
    summaries = []
    len_chunk=len(chunks)
    print("Note have been divided into chunks:"+str(len_chunk))
    for i, chunk in enumerate(chunks):
        # Reduce the chunk size dynamically if it exceeds the maximum sequence length
        while len(chunk) > max_tokens_per_chunk:
            max_tokens_per_chunk -= 50      
        try:
            summary = summarizer(chunk, max_length=200, min_length=100, do_sample=False)
            summaries.append(summary[0]['summary_text']+"\n\n")
            print(summary[0]['summary_text'])
            print("\n \n STATUS:"+str(i+1)+"/"+str(len_chunk))
            progress = (i+1)/len_chunk*100
            print("\n \n COMPLETED:"+str(progress)+"%")
        except Exception as e:
            print(f"An error occurred while summarizing chunk {i}: {str(e)}")
            exceptions = "\n".join(f"An error occurred while summarizing chunk {i}: {str(e)}")
    # Combine the summaries into a single summary
    combined_summary = " ".join(summaries)
    # Print and return the combined summary
    print("Combined Summary:")
    print(combined_summary)
    print("Deleting the saved file.......")
    os.remove("dat.txt")
    print("deleted....")
    return{"summary" : combined_summary,"exceptions" : exceptions}


async def gen_summary(dat):
    try:
        with open('dat.txt', "w") as file:
            file.write(dat)
    finally:
        pass

    with open("dat.txt", "r", encoding='utf-8') as file:
        text = file.read()                               # reading file

    loop = asyncio.get_running_loop()                   # making it to run in background
    return await loop.run_in_executor(None, summary, text)




router_summariser = APIRouter()


@router_summariser.get("/get-summary")
async def get_summary():
    file = read_files()
    data = await gen_summary(file)
    return data

@router_summariser.get("/summary-gen-progress") # route to track progress of summarization
def get_summary_progress():
    global progress
    if progress is None :
        return {"status" : "No summarisation process in progress" }
    elif progress == 100 :
        return {"status" : "Completed" , "value" : progress}
    elif progress in range(0,101) :
        return {"status" : progress}
    else :
        return {"invalid data detected"}





