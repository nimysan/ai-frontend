import { Breadcrumb, Spinner, ToggleSwitch } from "flowbite-react";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { useEffect, useRef, useState, type FC } from "react";
import { HiArrowRight, HiHome } from "react-icons/hi";
import { Textarea, Button } from "flowbite-react";
import axios from "axios";
import { FaBrain, FaSearch } from "react-icons/fa";

interface ChatMessage {
  human: string;
  assistant: string;
}

const ChatPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/bedrock">Amazon Bedrock</Breadcrumb.Item>
              <Breadcrumb.Item>Chat</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow">
                  <ChatDialog></ChatDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};

const ChatDialog = () => {
  interface Item {
    item_name: string;
    item_key: string;
    item_value: string;
  }
  const [config, setConfig] = useState<Item[]>([]);
  const [useKnowledgebase, setUseKnowledgebase] = useState(false);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const pushToList = (input: string, response: string) => {
    const newMessage: ChatMessage = {
      human: input,
      assistant: response,
    };
    setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);
  };
  const loadConfg = async () => {
    const response = await axios.get("/api/config");
    // debugger;
    setConfig(response.data);
  };
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };
  const chatWithAI = async () => {
    setLoading(true);
    try {
      //查找配置的prompt并使用这个prompt来做使用
      const prompt_rag_obj = config.find(
        (obj) => obj.item_key === "prompt_rag"
      );
      // debugger;
      const response = await axios.post(
        "/api/bedrock/" + (useKnowledgebase ? "rag" : "chat"),
        {
          input: question,
          prompt: prompt_rag_obj?.item_value,
        }
      );
      // debugger;
      pushToList(
        question,
        useKnowledgebase
          ? response.data.result.response.output.text
          : response.data.result.content[0].text
      );
      setQuestion(""); //clean the input
    } catch (error) {
      console.log("Error is " + error);
    } finally {
      setLoading(false);
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //每次都滚动到底部
    if (containerRef.current) {
      const objDiv = containerRef.current;
      objDiv.scrollTop = objDiv.scrollHeight;
    }
    loadConfg();
  }, [chatHistory]);
  return (
    <div className="relative h-[calc(100vh-200px)]  w-full border">
      <div
        className="mb-40 flex h-[calc(100vh-380px)] flex-col items-start overflow-y-auto"
        ref={containerRef}
        id="testp"
      >
        {chatHistory.map((item: ChatMessage) => (
          <ChatMessageItem
            key={item.human}
            human={item.human}
            assistant={item.assistant}
          />
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 w-full space-x-4 p-3"
        id="talkarea"
      >
        <div className="mx-auto w-full items-center rounded-lg" id="content">
          <div className="flex w-full  space-x-4 rounded-lg">
            <Textarea
              placeholder="输入你的问题..."
              rows={2}
              value={question}
              onChange={handleQuestionChange}
            />
            <div className="place-items-start gap-4">
              <Button color="primary" onClick={chatWithAI}>
                {loading ? (
                  <Spinner aria-label="Loading..." />
                ) : (
                  <HiArrowRight />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-5 w-full rounded-lg">
          <ToggleSwitch
            checked={useKnowledgebase}
            label={"With Knowledge base"}
            onChange={function (checked: boolean): void {
              // console.log(checked);
              setUseKnowledgebase(checked);
            }}
          ></ToggleSwitch>
        </div>
      </div>
    </div>
  );
};

const ChatMessageItem = ({ human, assistant }: ChatMessage) => {
  return (
    <div className="flex w-full items-start border-b-2 border-dashed border-blue-400">
      <div className="rounded-lg p-6">
        <div className="mb-6 flex items-start">
          <div className="flex items-start gap-4 ">
            <FaSearch className="text-2xl text-green-400"></FaSearch>
          </div>
          <div>
            <p className="ml-3 text-gray-800 dark:text-white">{human}</p>
          </div>
        </div>
        <div className="mb-6 flex items-start ">
          <div className="place-items-start gap-4 ">
            <FaBrain className="text-2xl text-purple-400"></FaBrain>
          </div>
          <div>
            <p className="ml-3  text-gray-800 dark:text-white">{assistant}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ChatDialog;

export default ChatPage;
