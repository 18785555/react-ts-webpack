import { Input, Popover, List } from "antd"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchHotItem } from "../constance";
import { getSearchHot } from "../utils/apis";

const searchWordStyle: React.CSSProperties = { fontSize: '14px', marginRight: '10px',cursor:'pointer' }
const searchContenStyle: React.CSSProperties = { fontSize: '12px', color: 'gray', marginRight: '10px' }
const searchHotContenStyle: React.CSSProperties = { fontSize: '14px', color: 'rgb(197, 1, 1)', marginRight: '10px' }
const resultContainerStyle: React.CSSProperties = { width: '300px', height: '500px', overflow: 'auto' }
const searchHotStyle: React.CSSProperties = { fontSize: '12px', fontWeight: 'bold', fontStyle: 'oblique', color: 'rgb(197, 1, 1)' }
const { Search } = Input;
function SearchResult() {
    const navigate = useNavigate()
    const [searchHotList, setSearchHotList] = useState<SearchHotItem[]>([])
    const onSearch = (value: string) => {
        // 不用问号直接接
        navigate(`/searchResult/${value}`)
    }
    const searchHot = () => {
        getSearchHot().then((res: any) => {
            setSearchHotList(res.data.data)
        })
    }
    
    const text = <span>热搜榜</span>;
    const content = (
        <div className="horizontal" style={resultContainerStyle}>
            <List
                itemLayout="horizontal"
                dataSource={searchHotList}
                renderItem={(item, index) => (
                    <List.Item>
                        <div>
                            <span style={index < 3 ? searchHotContenStyle : searchContenStyle}> {index + 1} </span>
                            <span onClick={()=>onSearch(item.searchWord)} style={searchWordStyle}> {item.searchWord} </span>
                            <span style={searchContenStyle}> {item.score} </span>
                            {index === 0 ? <span style={searchHotStyle}> HOT </span> : null}
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );

    return (
        <Popover placement="bottom" title={text} content={content} trigger="click">
            <Search placeholder="input search text" onFocus={searchHot} onSearch={onSearch} style={{ width: 300, marginTop: '16px' }} />
        </Popover>
    )
}
export default SearchResult