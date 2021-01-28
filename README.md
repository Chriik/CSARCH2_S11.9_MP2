# CSARCH2_S11.9_MP2

## Scope and Limitations

### Scope
CacheMe is a block-set associative cache simulator that uses the Most Recently Used (MRU) replacement algorithm. The cache simulator constructed for this web application can simulate two kinds of problem: simpleton and sequential. 

For both categories, the following inputs must be entered:
- Block size (words)
- Set size (blocks)
- Cache size (blocks/words)
- Cache access time (ns)
- Memory size (blocks/words)
- Memory access time (ns)

CacheMe performs error-checking on all the inputs before simulating the problem. All size inputs must be positive integers and a power of 2, while the time inputs must be positive real numbers. 

For simpleton cache simulation, the user must input a query sequence in terms of either blocks or addresses. The query sequence must solely consist of integers within the range of memory size. 

For sequential cache simulation, the user is required to input at least one task. Each task has a corresponding range of blocks/words to be accessed sequentially as well as a loop count that determines how many times it will be performed.  

Once all inputs have been entered, the following outputs will be shown:
- Cache table
- Cache misses
- Cache hits
- Total queries
- Miss penalty
- Average access time (ns)
- Total access time (ns)

The user is also given an option to save the output generated by the simulator via text file; however, the input would not be included in the text file anymore.

### Limitations
For simplicity purposes, the unit of access time inputs is fixed to nanoseconds. Moreover, CacheMe only assumes no load-through in computing for the miss penalty, total access time and average access time.

## Getting Started (Deployed Website)

1. Open a browser and go to the link `TODO: change to deployed link`
    ```
     change to deployed link
    ```

2. The website is now running.

### Features

* User may view the user guide through clicking the **User guide** button on the top right corner or clicking the **See how it works**. 

* User may go back to the home page wherever they are in the website through clicking the **CACHEME** on the upper left corner.

![HOME_PAGE](https://user-images.githubusercontent.com/49770088/106138095-a7a4e880-61a6-11eb-93f0-1a468284ab2e.png)

* User may simulate simpleton or sequential version by clicking on **Try now** or **Simulate** dropdown and pick the choice they want.

![Try now button](https://user-images.githubusercontent.com/49770088/106138394-0e2a0680-61a7-11eb-91b7-eafdf0d4853f.png)

<br>

![Simulate dropdown](https://user-images.githubusercontent.com/49770088/106138408-11bd8d80-61a7-11eb-8efa-88d7fa4ac6c6.png)

#### Simpleton

* For simpleton, users are allowed to input a query sequence in terms of memory block or memory address. These has to be separted with spaces.


#### Sequential

* For sequential, users can add tasks/varying loops through clicking the **+** icon while delete tasks/varying loops through the **-** icon. 

#### Simpleton & Sequential

* Both simpleton and sequential require the input for the following:

|            Inputs             |
| :---------------------------: |
| Block size  (words)           |
| Set size (blocks)             |
| Cache size (blocks/words)     |
| Cache access time (ns)        |
| Memory size (blocks/words)    |
| Memory access time (ns)       |

<br>

![Simpleton](https://user-images.githubusercontent.com/49770088/106139180-15054900-61a8-11eb-9f72-8e176e2ede50.png)

<br>

![Sequential](https://user-images.githubusercontent.com/49770088/106139118-fd2dc500-61a7-11eb-9c26-d46054cacd1f.png)

* Upon filling up the inputs, the user may opt to erase everything by clicking the **Reset** button or simulate the cache through clicking the **Simulate** button

![Reset And Simulate](https://user-images.githubusercontent.com/49770088/106139403-585fb780-61a8-11eb-974a-8949bcde7b6d.png)

* After simulating, the following outputs will be shown:

|          Outputs          |
| :------------------------:|
| Snapshot of Cache Memory  |
| Number of Cache Miss      |
| Number of Cache Hit       |
| Total                     |
| Miss Penalty              |
| Average Access Time       |
| Total Access Time         |

<br> 

![Outputs](https://user-images.githubusercontent.com/49770088/106140187-64984480-61a9-11eb-94e8-4de7e2630657.png)

* User may choose to store these outputs in a text file that will be downloaded once clicking the **Save as text file** button

![Save File](https://user-images.githubusercontent.com/49770088/106140246-7aa60500-61a9-11eb-973d-398b0f1b6ad6.png)

## To Run locally

### Prerequisites

NodeJS should be installed in your PC

### Installing Locally

1. Download the ZIP or create a clone of this repository into the PC

2. Open the folder in the command line and run `npm install` to install all packages needed for the application.
    ```
    npm install
    ```
3. After installation, run `node index.js` on the same command line
    ```
    node index.js
    ```
4. Open a browser and go to the link `localhost:8080`
    ```
    http://localhost:8080
    ```
