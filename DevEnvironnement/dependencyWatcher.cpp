#include <iostream>
#include <array>
#include <memory>
#include <string>
#include <openssl/sha.h>

#define LOG(x) std::cout << (x) << std::endl

std::string exec(const char* cmd) {
    std::array<char, 128> buffer;
    std::string result;
    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);


    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
        result += buffer.data();
    }
    return result;
}

/**
 * Method to get the md5 hash value of all libraries
*/
std::string getHash(){
    std::string libraries = exec("python3 -m pip freeze");

    unsigned char hash[SHA256_DIGEST_LENGTH];
   
    SHA256((const unsigned char*)(libraries.c_str()), libraries.length(), hash);


	char hexString[SHA256_DIGEST_LENGTH];
	 
	for(int i = 0; i < (SHA256_DIGEST_LENGTH/2) - 1; i++){
        sprintf(&hexString[i*2], "%02x", (unsigned int)hash[i]);
    }
    
    return hexString;
}


void updateRequirements(){
    system("python3 -m pip freeze > requirements.txt");
}
/**
 * Method to constantly check if a new library got added
*/
inline void checkDependencyLoop(){
    std::string lastHash = getHash();

    while (1)
    {
        std::string currentHash = getHash();

        if(lastHash != currentHash){
            //LOG("Dependencys got Updated");
            updateRequirements();
        }

        lastHash = currentHash;
    }
    
    
}


/**
 * Programm to automatic update the
 * requirmenets.txt file insed the 
 * dev container
*/
int main(int argc, char *argv[]){
    checkDependencyLoop();
}