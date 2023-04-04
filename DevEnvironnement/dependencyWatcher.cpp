#include <iostream>
#include <array>
#include <memory>
#include <string>
#include <vector>
#include <sstream>
#include <openssl/sha.h>
#include <sys/file.h>
#include <errno.h>

#define LOG(x) std::cout << (x) << std::endl

std::string exec(const char *cmd)
{
    std::array<char, 128> buffer;
    std::string result;
    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);

    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr)
    {
        result += buffer.data();
    }
    return result;
}

/**
 * Method to get sha256 hash
 */
std::string getSha256Hash(std::string &content)
{

    unsigned char hash[SHA256_DIGEST_LENGTH];

    SHA256((const unsigned char *)(content.c_str()), content.length(), hash);

    char hexString[SHA256_DIGEST_LENGTH];

    for (int i = 0; i < (SHA256_DIGEST_LENGTH / 2) - 1; i++)
    {
        sprintf(&hexString[i * 2], "%02x", (unsigned int)hash[i]);
    }

    return hexString;
}

void updateRequirements(std::string& pipLibraries)
{
    if (pipLibraries.empty())
    {
        system("python3 -m pip install -r requirements.txt");
    } else{
        system("python3 -m pip freeze > requirements.txt");
    }
}
/**
 * Method to constantly check if a new library got added
 */
inline void checkDependencyLoop()
{
    while (1)
    {
        std::string pipLibraries = exec("python3 -m pip freeze");
        std::string pipHash = getSha256Hash(pipLibraries);
        std::string fileLibraries = exec("cat requirements.txt");
        std::string fileHash = getSha256Hash(fileLibraries);

        if (fileHash != pipHash)
        {
            // LOG("Dependencys got Updated");
            updateRequirements(pipLibraries);
        }
    }
}

/**
 * Programm to automatic update the
 * requirmenets.txt file insed the
 * dev container
 */
int main(int argc, char *argv[])
{

    int fd = open("/tmp/dependencyWatcher.lock", O_RDWR | O_CREAT, 0666); // open or create lockfile
//check open success...
    int rc = flock(fd, LOCK_EX | LOCK_NB); // grab exclusive lock, fail if can't obtain.       LOG(rc);

    if (rc)
    {
        LOG("Watcher already running...");
        return 0;
    }
    else
    {
        checkDependencyLoop();
    }

    return 0;
}